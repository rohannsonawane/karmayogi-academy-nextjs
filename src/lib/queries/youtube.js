import { getSiteSettings } from './settings'

export async function getLatestYouTubeVideos() {
  try {
    const settings = await getSiteSettings()
    const youtubeUrl = settings?.youtube_url

    if (!youtubeUrl) {
      return null
    }

    // 1. Fetch the YouTube channel page to extract the RSS feed URL
    const channelRes = await fetch(youtubeUrl, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    
    if (!channelRes.ok) {
      console.error('Failed to fetch YouTube channel page')
      return null
    }

    const html = await channelRes.text()
    
    // Look for <link rel="alternate" type="application/rss+xml" title="RSS" href="...">
    const match = html.match(/href="(https:\/\/www\.youtube\.com\/feeds\/videos\.xml\?channel_id=[^"]+)"/)
    
    if (!match || !match[1]) {
      console.error('Could not find YouTube RSS feed link on channel page')
      return null
    }

    const rssUrl = match[1]

    // 2. Fetch and parse the RSS feed using rss2json public API
    // Using a public API to convert RSS to JSON to avoid bringing in an XML parsing library
    const feedRes = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`, {
      next: { revalidate: 3600 } // Cache for 1 hour
    })
    
    if (!feedRes.ok) {
      console.error('Failed to fetch from rss2json API')
      return null
    }

    const data = await feedRes.json()
    
    if (data.status !== 'ok' || !data.items) {
      console.error('Invalid response from rss2json API')
      return null
    }

    // Return the latest 4 videos
    return data.items.slice(0, 4).map((item, index) => {
      // rss2json returns thumbnail but it might be low res or default, we can also parse video id from link
      // item.link is usually https://www.youtube.com/watch?v=VIDEO_ID
      let videoId = null
      const idMatch = item.link.match(/v=([^&]+)/)
      if (idMatch && idMatch[1]) {
        videoId = idMatch[1]
      }
      
      const thumbnail = videoId ? `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg` : item.thumbnail

      return {
        id: videoId || String(index),
        title: item.title,
        url: item.link,
        thumbnail: thumbnail,
        publishedAt: item.pubDate
      }
    })

  } catch (error) {
    console.error('Error fetching YouTube videos:', error)
    return null
  }
}
