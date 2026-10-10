
 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProductVerification {
    struct Product {
        string name;
        string manufacturer;
        bool exists;
    }

    mapping(uint => Product) public products;

    function addProduct(
        uint id,
        string memory name,
        string memory manufacturer
    ) public {
        require(!products[id].exists, "Product already exists");

        products[id] = Product(name, manufacturer, true);
    }

    function verifyProduct(uint id) public view returns (bool) {
        return products[id].exists;
    }
}
