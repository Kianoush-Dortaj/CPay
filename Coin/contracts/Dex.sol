// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./IERC-20.sol";

contract Dex {
    struct Token {
        string token;
        address contractAddress;
    }

    mapping(string => Token) public tokens;

    constructor() {}

    function addToken(string memory token, address contractAddress) external {
        tokens[token] = Token(token, contractAddress);
    }

    function getTokenContractAddress(string memory token)
        external
        view
        returns (address)
    {
        return tokens[token].contractAddress;
    }

    function sendTokenWithSmartContractAddress(
        string memory token,
        address from,
        address to,
        uint256 amount
    ) external {
        IERC20 _token = IERC20(tokens[token].contractAddress);

        require(_token.approve(from, amount) == true, "you have not moeny");
        _token.transferFrom(from, to, amount);
    }
}
