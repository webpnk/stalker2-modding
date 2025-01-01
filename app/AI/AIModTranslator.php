<?php

declare(strict_types=1);

namespace App\AI;

use App\AI\DataObjects\DescribeChannelData;
use App\AI\Exceptions\DecodingException;
use GuzzleHttp\Exception\GuzzleException;

class AIModTranslator
{
    private const PROMPT = "
        Translate this STALKER 2 modification info to Ukrainian. Ignore abbreviations and proper nouns::
        Name: %s
        Summary: %s
    ";

    public function __construct(
        private readonly CohereClient $cohereClient,
    ) {
    }

    /**
     * @throws DecodingException
     * @throws GuzzleException
     */
    public function translate(string $name, string $summary): array
    {
        $prompt = sprintf(
            self::PROMPT,
            $name,
            $summary,
        );

        $json = $this->cohereClient->sendChatRequest($prompt, [
            "type" => "json_object",
            "schema" => [
                "type" => "object",
                "properties" => [
                    "name" => [
                        "type" => "string",
                    ],
                    "summary" => [
                        "type" => "string",
                    ],
                ],
                'required' => [
                    'name',
                    'summary',
                ],
            ]
        ]);

        return json_decode($json, true);
    }
}
