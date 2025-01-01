<?php

declare(strict_types=1);

namespace App\AI;

use App\AI\Exceptions\DecodingException;
use GuzzleHttp\Exception\GuzzleException;

interface AIClientInterface
{
    /**
     * @throws DecodingException|GuzzleException
     */
    public function sendChatRequest(string $message, ?array $responseFormat): string;
}
