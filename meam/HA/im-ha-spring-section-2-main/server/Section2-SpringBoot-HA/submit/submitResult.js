const axios = require('axios');
const fs = require('fs');
const homedir = require('os').homedir();
const path = require('path')
const prompt = require('prompt')
const open = require('open')

const endpoint = 'https://2j12cf7y29.execute-api.ap-northeast-2.amazonaws.com/dev/sprint/ls';
const codestates = 'https://2j12cf7y29.execute-api.ap-northeast-2.amazonaws.com/dev';
const result_File = 'junitResult.json';

const jsonRreult = JSON.parse(fs.readFileSync(result_File).toString());
const date = new Date();

console.log(`

========================================
코드스테이츠에 과제를 제출합니다.

+--------------------------------------+
과제 명 : ${jsonRreult.name}
+--------------------------------------+

과제 제출 완료 후에도 테스트를 계속 진행가능합니다.

========================================

`)

const ls = (user) => {
    return axios.get(`${endpoint}?user=${user}`)
    .then(({ data }) => {
      if (data.responseTrial.length === 0) {
        console.log('제출 기록이 없습니다.')
        return;
      }
  
      const result = data.responseTrial.reduce((arr, record) => {
        return record.assessments.reduce((arr, asmt) => {
          return [...arr, {
            name: record.name,
            timestamp: asmt.timestamp,
            result: asmt.result
          }]
        }, arr)
      }, [])
  
      console.log(result)
    })
  }

const getUser = (access_token, callback) => {
    return axios.get('https://api.github.com/user', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `bearer ${access_token}`
      }
    })
    .then(resp => {
      fs.writeFileSync(path.join(homedir, '.codestates-token'), `${access_token}\n${resp.data.id}`, 'utf8')
      callback(resp)
    })
    .catch(()=>{

    })
}

const codestateGetUser = (data) =>{
    return axios({
        method: 'post',
        url: `${codestates}/auth`,
        data: { id : data },
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res)=>{
        submit(res.data.users[0])
      })
      .catch(()=>{
        console.log("유저 정보를 받아오지 못하였습니다!")
      })
}

const submit = (data) => {
    let submitData = {
        name : jsonRreult.name,
        user : data,
        assessments : [{
          type : "mocha",
          timestamp : date,
          result : {
              numTotalTests: jsonRreult.tests,
              numPendingTests: jsonRreult.pending,
              filename: `${data.githubId}--${date.toISOString().replace(/\:/g, '-')}.zip`,
              numFailedTests: jsonRreult.failures,
              numPassedTests: jsonRreult.passes,
          }
        }]
      }

    return axios({
        method: 'post',
        url: `${codestates}/sprint`,
        data: submitData,
        headers: { 'Content-Type': 'application/json' },
      })
      .then((res)=>{
        console.log(` `);
        console.log(`========================================`);
        console.log(`과제가 정상적으로 제출되었습니다.`);
        console.log(` `);
        console.log(`- 과제 명 : ${submitData.name}`);
        console.log(`- 제출 시간 : ${date}`);
        console.log(`- 결과 :`);
        console.log(`   테스트 수 : ${submitData.assessments[0].result.numTotalTests}`);
        console.log(`   통과 : ${submitData.assessments[0].result.numPassedTests}`);
        console.log(`   실패 : ${submitData.assessments[0].result.numFailedTests}`);
        console.log(`========================================`)
        console.log(` `);
      })
      .catch(()=>{
        console.log(`
        과제 제출에 실패하였습니다.
        다시 시도하여 주세요.
        `)
      })
}


const submitRun = () => {
    const location = path.join(homedir, '.codestates-token')
    //console.log(location);
    if (fs.existsSync(location)) {
      const token = fs.readFileSync(location).toString()
      getUser(token.split('\n')[0], ({ data }) => {
        codestateGetUser(data.id);
        // console.log(`========================================`);
        // console.log(`과제 제출 기록`);
        // ls(data.id);
        // console.log(`========================================`)
      })
    }
  }

  submitRun();