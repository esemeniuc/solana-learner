use anchor_lang::prelude::*;

declare_id!("DLFZNZoSUxy8QXZ2onPccXZxG9gbSt4uZS788Ki2v9fJ");

#[program]
mod basic_0 {
    use super::*;
    pub fn initialize(_ctx: Context<Initialize>) -> Result<()> {
        msg!("helloooo");
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
