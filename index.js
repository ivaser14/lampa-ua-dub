import { decode } from 'base-64'

export default {
    title: '🇺🇦 Українська озвучка',
    version: '1.0.0',
    description: 'Фільми та серіали з українським дубляжем',
    url: 'ua-dub',
    types: ['movie', 'tv'],
    async get(params) {
        let html = await fetch('https://uafilm.pro/').then(r => r.text())

        const regex = /<a class="poster".*?href="(.*?)".*?src="(.*?)".*?title="(.*?)"/g
        const results = [...html.matchAll(regex)].slice(0, 20)

        return results.map(m => ({
            title: m[3],
            url: m[1],
            poster: m[2],
            id: m[1],
            type: params.type
        }))
    },
    async stream(movie) {
        const html = await fetch(movie.url).then(r => r.text())
        const match = html.match(/player.src\s*=\s*["'](.*?)["']/)
        if (!match) return []

        return [{
            title: '🇺🇦 Перегляд',
            url: match[1],
            type: 'hls'
        }]
    }
}
