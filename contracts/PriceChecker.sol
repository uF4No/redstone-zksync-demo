//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@redstone-finance/evm-connector/contracts/data-services/MainDemoConsumerBase.sol";

contract PriceChecker is MainDemoConsumerBase {
    function checkPrice(
        string memory _asset
    ) public view returns (uint256 price) {
        uint256 price = getOracleNumericValueFromTxMsg(
            bytes32(abi.encodePacked(_asset))
        );
    }
}
