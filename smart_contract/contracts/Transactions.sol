// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract Transactions {
    uint256 transactionCount;

    /*log activity on the blockchain so external apps
    (like your frontend or Hardhat) can listen for them.*/
    event Transfer(
        address from,
        address receiver,
        uint amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    // a custom data type.
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    // store all past transactions(dynamic).
    TransferStruct[] transactions;

    /*
    Parameters:
    receiver = address of the person getting the tokens.
    amount = how much (in wei/ether units).
    message & keyword = metadata for the transaction.
     */
    function addToBlockChain(
        address payable receiver,
        uint amount,
        string memory message,
        string memory keyword
    ) public payable {
        // Input validation
        require(receiver != address(0), "Invalid receiver address");
        require(amount > 0, "Amount must be greater than 0");
        require(bytes(message).length <= 100, "Message too long");
        require(bytes(keyword).length <= 20, "Keyword too long");
        require(msg.value >= amount, "Insufficient ETH sent");
        
        // Transfer ETH to receiver
        (bool success, ) = receiver.call{value: amount}("");
        require(success, "ETH transfer failed");
        
        transactionCount += 1;
        transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );

        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}
