const test = async () => {
    const result = await fetch('https://jsonplaceholder.org/posts');

    return await result.json()
}

test().then(data => {
    console.log(data.status_code)
})

const query = new URLSearchParams({
    $select: 'this',
    $filter: 'thisother'
})

console.log(`http://algo.com?${query}`);