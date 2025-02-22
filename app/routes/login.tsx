import { createFileRoute, redirect } from "@tanstack/react-router"
import { createServerFn } from "@tanstack/start"
import { FormEvent } from "react"
import { login } from "../auth"
import { setResponseStatus } from "vinxi/http"


const loginFn = createServerFn({ method: 'POST' })
.validator(data => {
    if (!(data instanceof FormData)) {
        throw new Error('Invalid form data')
      }
      const username = data.get('username')?.toString()
      const password = data.get('password')?.toString()
  
      if (!username || username.length <= 6 || !password || password.length <= 6) {
        setResponseStatus(401)
        throw new Error('A valid username and password are required')
      }
  
      return {username, password}
})
.handler(async ({data: {username, password}}) => {
    const session = await login(username, password)
    throw redirect({to: '/', headers: {
        'Set-Cookie': `session_id=${session.id}; Secure; HttpOnly`,
    }})
})

export const Route = createFileRoute('/login')({
  component: Login,
})

function Login(){
    async function handleLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        await loginFn({data: formData})
    }

    return <form onSubmit={handleLogin}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <button>Login</button>
    </form>
}