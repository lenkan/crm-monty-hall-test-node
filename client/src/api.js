import axios from 'axios';

export async function simulate(args) {
    const response = await axios.post("/simulate", args, { headers: { "Content-Type": "application/json" }});
    return response.data;
}

export async function healthy() {
  const response = await axios.get('/health')
  return response.status === 200;
}
