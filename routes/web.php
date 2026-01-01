<?php

declare(strict_types=1);

use App\Jobs\SendEmailJob;
use Psr\Http\Message\ResponseFactoryInterface;
use Qatar\Queue;
use Tez\Router;

/**
 * Register application routes.
 *
 * @param  Router  $router
 * @return void
 */
return function (Router $router): void {

    $router->route('/', 'HomeController@index');

    $router->route('/email', function ($request, Queue $queue, ResponseFactoryInterface $responseFactory) {
        $queue->push(SendEmailJob::class, [
            'to' => 'name@example.com',
        ]);

        $response = $responseFactory->createResponse();
        $response->getBody()->write('OK');

        return $response;
    });

    $router->route('/error', function () {
        throw new \Exception('Test error/exception handling');
    });
};
