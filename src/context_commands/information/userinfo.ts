import { ContextMenuCommandBuilder } from '@discordjs/builders'
import { info } from '../../messages/embeds'

const data = new ContextMenuCommandBuilder()
	.setName('userinfo')
    .setType('user')

