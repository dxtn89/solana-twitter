/*
export const getTweet = async (publicKey) => {
    return {
        publicKey,
        topic: 'solana',
        content: 'gm',
        author_display: 'B1Af..wtRN',
        created_at: 'Nov 26, 2021 1:03PM',
        created_ago: 'just now',
        timestamp: 1637932864,
    }
}
*/
import { useWorkspace } from '@/composables'
import { Tweet } from '@/models'

export const getTweet = async (publicKey) => {
    const { program } = useWorkspace()
    const account = await program.value.account.tweet.fetch(publicKey);
    return new Tweet(publicKey, account)
}