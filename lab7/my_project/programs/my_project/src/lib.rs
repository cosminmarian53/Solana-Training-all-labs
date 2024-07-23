use anchor_lang::prelude::*;

declare_id!("X65ohrPDWU332f3xyHRAiJjvbxb1L3CFWXCindFeWMf");

#[program]
pub mod my_project {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
