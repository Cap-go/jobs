import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const headers = new Headers()
headers.append('appid', '109')
headers.append('pragma', 'no-cache')
headers.append('systemid', 'Naukri')
headers.append('cache-control', 'no-cache')
headers.append('accept', 'application/json')
headers.append('content-type', 'application/json')
headers.append('user-agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36')

export async function fetchJobs(pageNum: number) {
  const jsonPath = join(process.cwd(), 'src', 'jobs', `ionic_${pageNum}.json`)
  try {
    if (existsSync(jsonPath)) return JSON.parse(readFileSync(jsonPath, 'utf8'))
  } catch (e) {}
  const origin = new URL('https://www.naukri.com/jobapi/v3/search')
  origin.searchParams.set('noOfResults', '20')
  origin.searchParams.set('urlType', 'search_by_keyword')
  origin.searchParams.set('searchType', 'adv')
  origin.searchParams.set('pageNo', pageNum.toString())
  origin.searchParams.set('keyword', 'ionic framework')
  origin.searchParams.set('seoKey', 'ionic-framework-jobs')
  origin.searchParams.set('src', 'directSearch')
  const call = await fetch(origin.toString(), { headers })
  if (call.ok) {
    const data = await call.json()
    if (data?.noOfJobs) {
      try {
        writeFileSync(jsonPath, JSON.stringify(data.jobDetails), 'utf8')
      } catch (e) {}
      return data.jobDetails
    }
  } else console.log(call.ok)
}

export function readJobs() {
  const jsonPath = join(process.cwd(), 'src', 'jobs')
}
