<?php

namespace App\Services\Cesa;

use Illuminate\Support\Facades\Http;

class Client
{
    public function __construct(
        protected string $endpoint,
        protected int $appId,
        protected string $appSecret,
        protected int $timeout = 10,
    ) {
    }

    /**
     * Récupère un access_token et l'enregistre dans la session
     *
     * @param  string  $username
     * @param  string  $password
     * @return array
     */
    public function token(string $username, string $password): array
    {
        $request = Http::withHeaders(['User-Agent' => 'AppCesa/1.0.0'])->acceptJson()->timeout(seconds: $this->timeout);

        try {
            session()->forget('apptoken');
            session()->forget('appuser');

            $response = $request->post(
                "{$this->endpoint}/oauth/token",
                [
                    'grant_type' => 'password',
                    'client_id' => $this->appId,
                    'client_secret' => $this->appSecret,
                    'username' => $username,
                    'password' => $password,
                ]
            );

            if ($response->failed()) {
                return ['body' => $response->json(), 'status' => $response->status()];
            }

            $result = $response->json();
            session(['apptoken' => encrypt($result['access_token'])]);

            $result = $this->user();
            session(['appuser' => $result['body']]);

            return ['body' => 'Vous ête connecté.', 'status' => $response->status()];
        } catch (\Exception $e) {
            throw ($e);
        }
    }

    /**
     * Déconnexion - suppression des variables de session
     *
     * @return array
     */
    public function logout(): array
    {
        session()->forget('apptoken');
        session()->forget('appuser');

        return ['body' => 'Vous ête déconnecté.', 'status' => 200];
    }

    /**
     * Retourne les info sur la personne connectée
     *
     * @return array
     */
    public function user()
    {
        return $this->_request('user', 'get');
    }

    /**
     * Retourne la liste des clients
     *
     * @return array
     */
    public function clients(array $params): array
    {
        return $this->_request('clients/filter', 'get', $params);
    }

    /**
     * Enregistre un nouvel AR
     *
     * @return array
     */
    public function reception(): array
    {
        $params = [];

        return $this->_request('receptions', 'post', $params);
    }

    /**
     * Exécute une requête
     *
     * @param  string  $operation L'endpoint sur l'API v1
     * @param  string  $method
     * @param  array  $params
     * @return array
     */
    private function _request(string $operation, string $method = 'post', array $params = []): array
    {
        if ($method !== 'get' && $method !== 'post') {
            return ['body' => ['message' => 'Opération non autorisée.'], 'status' => 405];
        }

        $request = Http::withHeaders(['User-Agent' => 'AppCesa/1.0.0', 'Authorization' => 'Bearer ' . decrypt(session('apptoken'))])
            ->acceptJson()
            ->timeout(seconds: $this->timeout);

        try {
            if ($method === 'get') {
                $response = $request->get("{$this->endpoint}/{$operation}", $params);
            }
            if ($method === 'post') {
                $response = $request->post("{$this->endpoint}/{$operation}", $params);
            }

            return ['body' => $response->json(), 'status' => $response->status()];
        } catch (\Exception $e) {
            throw ($e);
        }
    }
}
