pragma solidity >0.5.0;
pragma experimental ABIEncoderV2;

import "./ERC721Mintable.sol";
import "./verifier.sol";

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>

// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class
contract SolnSquareVerifier is CustomERC721Token, Verifier {
  using Counters for Counters.Counter;
  // TODO define a solutions struct that can hold an index & an address
  struct Solution {
    bytes32 index;
    address caller;
  }
  // keep track of the generated tokenIds
  Counters.Counter tokenId;
  // TODO define an array of the above struct
  Solution[] solutions;
  // TODO define a mapping to store unique solutions submitted
  mapping(address => Solution) uniqSolutions;
  // TODO Create an event to emit when a solution is added
  event SolutionAdded(bytes32 indexed index, address indexed caller);
  // check wether a solution has been submitted for a given caller
  modifier isUniqSolution(Proof memory proof, address caller) {
    require(
      uniqSolutions[caller].index != keccak256(abi.encode(proof)),
      "proof must be uniq"
    );
    _;
  }

  // TODO Create a function to add the solutions to the array and emit the event
  function add(Proof memory proof, address caller) internal {
    bytes32 _proof = keccak256(abi.encode(proof));
    Solution memory _solution = Solution({ index: _proof, caller: caller });
    solutions.push(_solution);
    uniqSolutions[caller] = _solution;
    emit SolutionAdded(_proof, caller);
  }

  // TODO Create a function to mint new NFT only after the solution has been verified
  //  - make sure the solution is unique (has not been used before)
  //  - make sure you handle metadata as well as tokenSuplly

  function mintToken(Proof calldata proof, uint256[2] calldata inputs)
    external
    isUniqSolution(proof, msg.sender)
  {
    bool check = verifyTx(proof, inputs);
    require(check, "proof must be valid");
    add(proof, msg.sender);
    tokenId.increment();
    mint(msg.sender, tokenId.current());
  }
}
