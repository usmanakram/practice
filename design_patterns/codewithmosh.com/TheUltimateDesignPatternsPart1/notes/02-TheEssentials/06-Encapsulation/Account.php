<?php

class Account
{
	// public $balance;
	private $balance;

	/*public function setBalance(float $balance)
	{
		if ($balance > 0) {
			$this->balance = $balance;
		}
	}*/

	public function getBalance()
	{
		return $this->balance;
	}

	public function deposit(float $amount)
	{
		if ($amount > 0) {
			$this->balance += $amount;
		}
	}

	public function withdraw(float $amount)
	{
		if ($amount > 0) {
			$this->balance -= $amount;
		}
	}
}

?>