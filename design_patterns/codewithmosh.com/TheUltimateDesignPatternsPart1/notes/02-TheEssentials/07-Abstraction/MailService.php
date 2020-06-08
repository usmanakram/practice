<?php

class MailService
{
	public function sendEmail()
	{
		$this->connect();
		$this->authenticate();
		// Send email
		$this->disconnect();
	}

	// public function connect()
	private function connect()
	{
		echo 'Connect<br />';
	}

	// public function disconnect()
	private function disconnect()
	{
		echo 'Disonnect<br />';
	}

	// public function authenticate()
	private function authenticate()
	{
		echo 'Authenticate<br />';
	}
}

?>