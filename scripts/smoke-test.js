// scripts/smoke-test.js

const axios = require("axios")

const BASE = "http://localhost:8000"

async function test(name, fn) {
  try {
    await fn()
    console.log(`✔ ${name}`)
  } catch (err) {
    console.log(`✖ ${name}`)
    console.log(`   ${err.message}`)
  }
}

async function run() {

  console.log("\nFUNCTIONAL SMOKE TEST\n")

  await test("Server health", async () => {
    const res = await axios.get(`${BASE}/health`)
    if (res.status !== 200) throw new Error("Health check failed")
  });

  await test("Login page", async () => {
    const res = await axios.get(`${BASE}/auth/login`)
    if (res.status !== 200) throw new Error("Login page not reachable")
  });

  await test("Login endpoint", async () => {

    const email = `smoke${Date.now()}@test.com`

    await axios.post(`${BASE}/auth/register`, {
      name: "smoke",
      email,
      password: "123456"
    })

    const res = await axios.post(`${BASE}/auth/login`, {
      email,
      password: "123456"
    })

    if (!res.data.token) throw new Error("JWT not returned")
  });

  await test("Login wrong password", async () => {
    const email = `smoke${Date.now()}@test.com`

    await axios.post(`${BASE}/auth/register`, {
      name: "smoke",
      email,
      password: "123456"
    })

    try {
      await axios.post(`${BASE}/auth/login`, {
        email,
        password: "wrongpassword"
      })

      throw new Error("Expected 401")

    } catch (err) {
      if (err.response?.status !== 401) {
        throw new Error("Expected 401")
      }
    }
  });

  await test("Login missing email", async () => {
    try {
      await axios.post(`${BASE}/auth/login`, {
        password: "123456"
      })

      throw new Error("Expected 400")

    } catch (err) {
      if (err.response?.status !== 400) {
        throw new Error("Expected 400")
      }
    }
  });

  await test("Register invalid", async () => {
    try {
      await axios.post(`${BASE}/auth/register`, {
        email: "",
        password: ""
      })

      throw new Error("Expected 400")

    } catch (err) {
      if (err.response?.status !== 400) {
        throw new Error("Expected 400")
      }
    }
  });

  await test("Register endpoint", async () => {
    const res = await axios.post(`${BASE}/auth/register`, {
      name: "smoke",
      email: `smoke${Date.now()}@test.com`,
      password: "123456"
    })

    if (!res.data) throw new Error("Register response invalid")
  });

  console.log("\nSmoke test completed\n")
}

run()