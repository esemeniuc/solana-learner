const anchor = require("@project-serum/anchor");
const idl = `
  {
  "version": "0.1.0",
  "name": "basic_0",
  "instructions": [
    {
      "name": "initialize",
      "accounts": [],
      "args": []
    }
  ],
  "metadata": {
    "address": "DLFZNZoSUxy8QXZ2onPccXZxG9gbSt4uZS788Ki2v9fJ"
  }
}
`
describe("basic-eric", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.local());

  it("Uses the workspace to invoke the initialize instruction", async () => {
    // const wallet = new anchor.Wallet(keypair)
    // const provider = anchor.Provider(this.connection, wallet, opts);
    const provider = anchor.AnchorProvider.env();
    const programId = 'DLFZNZoSUxy8QXZ2onPccXZxG9gbSt4uZS788Ki2v9fJ'
    const program = new anchor.Program(JSON.parse(idl), programId, provider); // just set a while new program

    // Execute the RPC.
    await program.rpc.initialize();
    // #endregion code
  });
});
