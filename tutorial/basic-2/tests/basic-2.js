const assert = require("assert");
const anchor = require("@project-serum/anchor");
const {SystemProgram} = anchor.web3;

describe("basic-2", () => {
    const provider = anchor.AnchorProvider.local();

    // Configure the client to use the local cluster.
    anchor.setProvider(provider);

    // Counter for the tests.
    const counter = anchor.web3.Keypair.generate();

    // Program for the tests.
    const program = anchor.workspace.Basic2;

    it("Creates a counter", async () => {
        // await program.rpc.create(provider.wallet.publicKey, {
        //     accounts: {
        //         counter: counter.publicKey,
        //         user: provider.wallet.publicKey,
        //         systemProgram: SystemProgram.programId,
        //     },
        //     signers: [counter],
        // });

        // let counterAccount = await program.account.counter.fetch(counter.publicKey);
        //
        // assert.ok(counterAccount.authority.equals(provider.wallet.publicKey));
        // assert.ok(counterAccount.count.toNumber() === 0);

        const kp2 = anchor.web3.Keypair.generate();
        console.log("b provider wallet balance",await provider.connection.getBalance(provider.wallet.publicKey));
        console.log("b kp2 balance",await provider.connection.getBalance(kp2.publicKey));

        const tx = new anchor.web3.Transaction().add(anchor.web3.SystemProgram.transfer({
            fromPubkey: provider.wallet.publicKey,
            lamports: 10000000000,
            toPubkey: kp2.publicKey
        }));

        const txHash = await provider.sendAndConfirm(tx, [provider.wallet.payer]);
        console.log("a provider wallet balance",await provider.connection.getBalance(provider.wallet.publicKey));
        console.log("a kp2 balance",await provider.connection.getBalance(kp2.publicKey));



        await program.rpc.create(provider.wallet.publicKey, {
            accounts: {
                counter: counter.publicKey,
                user: kp2.publicKey,
                systemProgram: SystemProgram.programId,
            },
            signers: [counter,kp2],
        });
        let counterAccount = await program.account.counter.fetch(counter.publicKey);
        await program.rpc.increment({
          accounts: {
            counter: counter.publicKey,
            authority: provider.wallet.publicKey,
          },
            signers: [],

        });
        assert.ok(counterAccount.authority.equals(provider.wallet.publicKey));
        assert.ok(counterAccount.count.toNumber() === 0);

    });

    // it("Updates a counter", async () => {
    //   await program.rpc.increment({
    //     accounts: {
    //       counter: counter.publicKey,
    //       authority: provider.wallet.publicKey,
    //     },
    //   });
    //
    //   const counterAccount = await program.account.counter.fetch(
    //     counter.publicKey
    //   );
    //
    //   assert.ok(counterAccount.authority.equals(provider.wallet.publicKey));
    //   assert.ok(counterAccount.count.toNumber() == 1);
    // });
});
