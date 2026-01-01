<?php

declare(strict_types=1);

namespace App\Jobs;

use Qatar\Job;

class SendEmailJob extends Job
{
    /**
     * Handle the job.
     *
     * @param  array<string, mixed>  $payload  Job data passed when the job was queued.
     */
    public function handle(array $payload): void
    {
        echo 'Sending email to '.$payload['to'].'...'.PHP_EOL;
        sleep(3);
        echo 'Email sent to '.$payload['to'].PHP_EOL;
    }
}
