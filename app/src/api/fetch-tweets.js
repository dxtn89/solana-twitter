/*
export const fetchTweets = async () => {
    return [
        {
            topic: 'solana',
            content: 'gm',
            author_display: 'B1Af..wtRN',
            created_at: 'Nov 26, 2021 1:03PM',
            created_ago: 'just now',
            timestamp: 1637932864,
        },
        {
            topic: 'no-code',
            content: 'Octohook.com is awesome!',
            author_display: 'BnE7..NRGF',
            created_at: 'Nov 26, 2021 1:03PM',
            created_ago: '2 hours ago',
            timestamp: 1637932864,
        },
        {
            topic: '',
            content: 'Just setting up my Solana twttr',
            author_display: 'B1Af..wtRN',
            created_at: 'Nov 26, 2021 1:03PM',
            created_ago: '2 days ago',
            timestamp: 1637932864,
        },
    ]
}
*/
import { useWorkspace } from "@/composables";
import { Tweet } from '@/models'
import { bs58 } from "@project-serum/anchor/dist/cjs/utils/bytes";

export const fetchTweets = async (filters = []) => {
    const { program } = useWorkspace()
    const tweets = await program.value.account.tweet.all(filters);
    return tweets.map(tweet => new Tweet(tweet.publicKey, tweet.account))
}

export const authorFilter = authorBase58PublicKey => ({
    memcmp: {
        offset: 8, // Discriminator.
        bytes: authorBase58PublicKey,
    }
})

export const topicFilter = topic => ({
    memcmp: {
        offset: 8 + // Discriminator.
            32 + // Author public key.
            8 + // Timestamp.
            4, // Topic string prefix.
        bytes: bs58.encode(Buffer.from(topic)),
    }
})