import { fetchJobs } from './src/lib/db'

await Promise.all(new Array(500).fill(0).map((_, idx) => fetchJobs(idx)))
