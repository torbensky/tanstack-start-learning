import * as crypto from "node:crypto";

interface User {
    id: string
    username: string
    displayName: string
}

interface Session {
    id: string
    user: User
}

// this is just a demo and not at all suitable for production purposes
const DEMO_USERS = [{
    id: "10250150180",
    username: "user1234",
    password: "not-secure",
    displayName: 'Test Person'
}]

type session = {sessionId: string, userId: string}
let sessions: Array<session> = []

export async function login(username: string, password: string): Promise<Session> {
    console.log(`login ${username}`)
    await new Promise(resolve => setTimeout(resolve, 1000)) // simulate DB lookup
    let user = DEMO_USERS.find(u => u.username === username && u.password === password)
    if(user){
        let session = await createSession(user.id)
        return {
            id: session.sessionId,
            user,
        }
    }

    throw new Error("Invalid user credentials")
}

export async function getSessionUser(sessionId: string): Promise<User|undefined> {
    console.log('Getting user for session')
    const session = sessions.find(s => s.sessionId === sessionId)
    if(session){
        console.log("Session found")
        return DEMO_USERS.find(u => u.id === session.userId)
    }
}

export async function logout(sessionId: string): Promise<void> {
    console.log("Logging out session")
    let idx = sessions.findIndex(s => s.sessionId === sessionId)
    if(idx !== -1){
        sessions.splice(idx, 1)
    }
}

async function createSession(userId: string) {
    return {userId, sessionId: crypto.randomBytes(20).toString('hex')}
}