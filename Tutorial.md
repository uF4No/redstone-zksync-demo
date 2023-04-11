Init project with zkSync CLI: `zksync-cli create redstone-tutorial`


Install redstone dependency `yarn add @redstone-finance/evm-connector`

Create `PriceChecker.sol` inside the `/contracts` folder with this code:

```js
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@redstone-finance/evm-connector/contracts/data-services/MainDemoConsumerBase.sol";

contract PriceChecker {
    function checkPrice(string memory _asset) returns (uint256 price) {
        uint256 price = getOracleNumericValueFromTxMsg(bytes32(_asset));
    }
}
```

Compile with `yarn hardhat compile`
