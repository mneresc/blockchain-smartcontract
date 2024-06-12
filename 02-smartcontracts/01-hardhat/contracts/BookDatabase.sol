// SPDX-License-Identifier: MIT

pragma solidity ^0.8.12;

contract BooksDatabase {
    struct Book {
        string title;
        uint16 year;
    }

    address owner;

    uint32 id;

    uint256 public count;

    mapping(uint32 => Book) public books;

    function addBook(Book memory newBook) public {
        id++;
        count ++;
        books[id] = newBook;
    }

    constructor(){
        owner = msg.sender;
    }

    function editBook(uint32 idBook, Book memory newBook) public {
        Book memory oldBook = books[idBook];

        if (
            !compare(oldBook.title, newBook.title) &&
            !compare(oldBook.title, "")
        ) {
            oldBook.title = newBook.title;
        }

        if (newBook.year != 0 && oldBook.year != newBook.year) {
            oldBook.year = newBook.year;
        }

        books[idBook] = oldBook;
    }

    function deleteBook(uint32 idBook) public restricted{
        if(books[idBook].year > 0){
            count--;
            delete books[idBook];
        }
    }

    // pure not write or read from blockchain
    function compare(string memory needed, string memory expected)
        private
        pure
        returns (bool)
    {
        bytes memory arrNeeded = bytes(needed);
        bytes memory arrExpected = bytes(expected);
        return
            arrNeeded.length == arrExpected.length &&
            keccak256(arrNeeded) == keccak256(arrExpected);
    }

    modifier restricted(){
        require(owner == msg.sender, "Sai daqui o seu cachorro!");
        _;
    }
}
//["1984", 1949]

