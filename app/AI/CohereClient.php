<?php

declare(strict_types=1);

namespace App\AI;

use App\AI\Exceptions\DecodingException;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use JsonException;

readonly class CohereClient implements AIClientInterface
{
    public function __construct(
        private string $apiUrl,
        private string $apiKey,
        private bool   $trial,
        private Client $httpClient,
    ) {
    }

    /**
     * @param string $message
     * @param array|null $responseFormat
     * @throws DecodingException|GuzzleException
     */
    public function sendChatRequest(string $message, ?array $responseFormat = null): string
    {
        if ($this->trial) {
            sleep(6);
        }

        $response = $this->httpClient->post("{$this->apiUrl}/chat", [
            'headers' => [
                'Authorization' => 'Bearer ' . $this->apiKey,
                'Content-Type' => 'application/json',
            ],
            'json' => [
                'model' => 'command-r-08-2024',
                'message' => $message,
                'temperature' => 0.3,
                'chat_history' => [],
                ...($responseFormat !== null ? ['response_format' => $responseFormat] : []),
            ],
        ]);

        $json = $response->getBody()->getContents();

        try {
            $decoded = json_decode($json, true, 512, JSON_THROW_ON_ERROR);
        } catch (JsonException) {
            throw new DecodingException('Invalid JSON response from Cohere API');
        }

        if (!isset($decoded['text'])) {
            throw new DecodingException('No text present in response');
        }

        return $decoded['text'];
    }


    /**
     * @throws DecodingException
     * @throws GuzzleException
     */
    public function generateEmbeddings(array $texts): array
    {
        if ($this->trial) {
            sleep(6);
        }

        try {
            $response = $this->httpClient->post("{$this->apiUrl}/embed", [
                'headers' => [
                    'Authorization' => 'Bearer ' . $this->apiKey,
                    'Content-Type' => 'application/json',
                ],
                'json' => [
                    'model' => 'embed-multilingual-v3.0',
                    'texts' => $texts,
                    'input_type' => 'search_document',
                    'truncate' => 'NONE',
                ],
            ]);

            $json = $response->getBody()->getContents();
            $decoded = json_decode($json, true, 512, JSON_THROW_ON_ERROR);


            if (!isset($decoded['embeddings'])) {
                throw new DecodingException('No embeddings present in response');
            }

            return $decoded['embeddings'];
        } catch (JsonException $e) {
            throw new DecodingException('Invalid JSON response from Cohere API');
        }
    }
}
