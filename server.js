const express = require('express');
const app = express();
const port = 4000;
const {graphqlHTTP} = require('express-graphql');
const {buildSchema} = require('graphql');
//node settings


const schema = buildSchema(`
    type Query {
        posts: [Post],
        comments: [Comment]
    }
    type Post {
        id: ID!
        title: String!
        description: String!
        comments: [Comment]
    }

    type Comment {
        id: ID!
        text: String!
        likes: Post
    }
`);
//Schema를 만드는 함수
//type Post 설명 : 
// :! = important(css에서의 그 important 맞다)
// post로 보낼 값을 정해줌
// Comment 설명 : 
// post로 보낸 값을 comment로 받을 때, comment로 받을 값을 입력해주는 공간.

const root = {
    posts : [
        {
            id: 'post1',
            title: 'title1',
            description: 'description1',
            comments: [
                {
                    id: 'comment1',
                    text: 'test1',
                    likes: 1
                }]
        },
        {
            id: 'post2',
            title: 'title2',
            description: 'description2',
            comments: [

            ]
        }
    ],
    comments : [
        {
            id: 'comment1',
            text: 'test1',
            likes: 1
        }
    ]
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