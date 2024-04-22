// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/* Complex smart contract pentru achizitionarea unor bijuterii . Dupa initializarea balantei , contractul este creat . 
   Utilizatorul - poate adauga bijuterii (Cod unic , nume , pret ) .
                - poate sa vizualizeze bijuteriile disponibile.
                - poate vizualiza balanta contractului.
                - poate sa cumpere bijuterii introducand id ul bijuteriei , balanta fiind actualizata. */

contract JewelryShop {
    struct Jewelry {
        uint256 uniCode;
        string name;
        uint256 price;
    }

    mapping (address => Jewelry[]) private jewels;
    uint256 public contractBalance;

    event BuyJewelry(uint256 _uniCode , string name , uint256 price);

    constructor() payable {
        contractBalance = address(this).balance;
    }

    function addJewels(uint256 _uniCode , string memory _name , uint256 _price) public {
        jewels[msg.sender].push(Jewelry(_uniCode, _name , _price));
    }

    function getJewels() external view returns (Jewelry[] memory){
        return jewels[msg.sender];
    }

    function buyJewelry(uint256 _uniCode) public payable {
        for(uint256 i = 0 ; i < jewels[msg.sender].length ; i++){
            if(_uniCode == jewels[msg.sender][i].uniCode){
                require(contractBalance >= jewels[msg.sender][i].price, "Insufficient funds to buy this jewelry");

                contractBalance -= jewels[msg.sender][i].price;
                string memory name = jewels[msg.sender][i].name;
                uint256 price = jewels[msg.sender][i].price;
                emit BuyJewelry(_uniCode, name, price);
                delete jewels[msg.sender][i];
                return;
            }
        }

        revert("Jewelry not found with the given uniCode in seller's jewelry list !");
    }
}