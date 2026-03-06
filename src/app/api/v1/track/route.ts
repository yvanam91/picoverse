import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/utils/supabase/admin'
import { UAParser } from 'ua-parser-js'

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { type, projectId, pageId, sessionId, blockId, blockType } = body

        if (!projectId || !pageId || !type) {
            return new NextResponse(null, { status: 400 })
        }

        const userAgent = req.headers.get('user-agent') || ''
        const parser = new UAParser(userAgent)
        const device = parser.getDevice()

        // Normalize device type: mobile, tablet, or desktop
        let deviceType = 'desktop'
        if (device.type === 'mobile') deviceType = 'mobile'
        else if (device.type === 'tablet') deviceType = 'tablet'

        const supabase = createAdminClient()

        if (type === 'visit') {
            const { error } = await supabase.from('stats_visits').insert({
                project_id: projectId,
                page_id: pageId,
                session_id: sessionId,
                device: deviceType
            })
            if (error) console.error('Error inserting visit:', error)
        } else if (type === 'click') {
            const { error } = await supabase.from('stats_clicks').insert({
                project_id: projectId,
                page_id: pageId,
                session_id: sessionId,
                block_id: blockId,
                block_type: blockType,
                device: deviceType
            })
            if (error) console.error('Error inserting click:', error)
        }

        return new NextResponse(null, { status: 204 })
    } catch (error) {
        console.error('Analytics Route Error:', error)
        return new NextResponse(null, { status: 500 })
    }
}
