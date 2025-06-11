const { MongoClient } = require("mongodb");

// MongoDB 연결 URI
const uri = "mongodb://admin:admin@172.24.10.1:27017/?authSource=admin&retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();

        const database = client.db('948301d2-3e01-4c1e-850e-7866c2c19767');

        // listCollections()는 Promise를 반환하므로 await로 기다려야 함
        // const collection = await database.listCollections({ name: /^_/ }).toArray(); // await 추가
        const collection = database.collection("AlarmsLatestValues")

        // 각 컬렉션 이름 출력
        // collections.forEach(collection => {
        //     console.log(collection.name);
        // });

        const query = { MwPath: /PDDevice3x/i }

        const projection = {
            MwPath: 1,  // 1은 해당 필드를 포함시키겠다는 의미
            _id: 0
        };

        const documents = await collection.find(query).project(projection).toArray()

        console.log(documents)

    }
    catch (err) {
        console.error('MongoDB 연결 실패:', err);
    }
    finally {
        // 연결 종료
        await client.close();
    }
}

run().catch(console.dir);