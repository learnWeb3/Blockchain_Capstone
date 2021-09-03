var SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const fs = require("fs");

const importFiles = () => {
  const dirContent = fs.readdirSync(process.cwd() + "/../proofs");
  return dirContent.map((file) =>
    JSON.parse(fs.readFileSync(process.cwd() + "/../proofs/" + file).toString())
  );
};

module.exports = async function (callback) {
  const proofs = importFiles();
  const contract = await SolnSquareVerifier.at(
    "0x8D0A45C467DC1c7255b9Fcb759bE80c495617088"
  );
  try {
    // await contract.mintToken(proof.proof, proof.inputs);
    await Promise.all(
      proofs.map(async ({ proof, inputs }) => {
        await contract.mintToken(proof, inputs);
      })
    );

    console.log("new tokens minted with success");
  } catch (error) {
    console.log(error);
  }
};
