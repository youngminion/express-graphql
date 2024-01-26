const express = require('express');
const app = express();
const port = 4000;
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
//node settings


const schema = buildSchema(`
    type Query {
        description: String
    }
`);
//Schema를 만드는 함수

const root = {
    description: "I am John"
};
//Query의 결과값을 나타내는 함수 

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}))
//app.use = /graphql 도메인 연결

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}/graphql`);
});
//app.listen = listen 이란 request(컴퓨터(서버)가 누군가의 요청)를 알아채고 무언가 해야된다는 것을 뜻한다.
//여기서는 localhost:4000/graphql 도메인을 실행시키는 역할을 한다.