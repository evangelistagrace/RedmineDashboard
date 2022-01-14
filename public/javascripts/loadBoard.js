// api key
let api_key = '7677f0e98074981d60b32e28b535a9e8855fbdee'

// base url
let api_base_url = 'http://redmine.mmu.edu.my/redmine/'

// api url
let api_issues_url = `${api_base_url}issues.json?key=${api_key}&project_id=3&status_id=*&offset=0&limit=100`
// &offset=0&limit=100&sort=created_on:desc
let promises = []

init()

function init() {
    let all_issues = [],
        trackers = [
            //TODO: add task, technical document
            {
                name: 'Pre-BE',
                id: 22
            },
            {
                name: 'BE',
                id: 5
            },
            {
                name: 'Bug',
                id: 1
            }
        ]
    
    //  get issues for each tracker
    trackers.forEach(tracker => {
        let promise = new Promise((resolve, reject) => {
            fetch(`${api_issues_url}&tracker_id=${tracker.id}`)
            .then(data => data.json())
            .then(res => {
                res.issues.forEach(issue => all_issues.push(issue))
                resolve(res.issues)
            })
        })

        promises.push(promise)
        
    })


    Promise.all(promises).then((values) => {
        
        // sort issues by created date (desc)
        all_issues.sort(function(a, b) {
            var c = new Date(a.created_on);
            var d = new Date(b.created_on);
            return d-c;
        })

        displayIssues(all_issues)
    });

    
}

function displayIssues(issues) {
    //boards
    const to_do = document.getElementById('to-do'),
        in_progress = document.getElementById('in-progress'),
        testing = document.getElementById('testing'),
        completed = document.getElementById('completed')

    let board = '',
        flair_color = '',
        card = '',
        list

    // empty boards
    to_do.innerHTML = ''
    in_progress.innerHTML = ''
    testing.innerHTML = ''
    completed.innerHTML = ''

    issues.forEach(issue => {
        //set flair color and assign board
        switch (issue.tracker.name) {
            case 'Bug':
                flair_color= 'warning'
                switch (issue.status.name) {
                    case 'Request List':
                        board = to_do
                        break
                    case 'Dev. In Progress':
                    case 'Complete in Dev':
                    case 'Request to Deploy':
                        board = in_progress
                        break
                    case 'Deployed':
                        board = completed
                        break
                    default:
                        break
                }
                break;
            case 'BE':
                flair_color = 'success'
                switch (issue.status.name) {
                    // FIXME: for future-proof, loop through status names from file with list of statuses instead
                    case 'Request List':
                    case 'Pending TRC/CRC':
                    case 'TRC/CRC Approved':
                    case 'FDS in Progress':
                    case 'FDS Review': 
                    case 'FDS Verified':
                    case 'FDS Sent':
                    case 'Queue to Develop':
                    case 'Dev. In Progress':
                    case 'Complete in Dev':
                        board = in_progress
                        break
                    case 'UAT Ready':
                    case 'UAT Accepted':
                    case 'UAT Fixing':
                    case 'Request to Deploy':
                        board = testing
                        break;
                    case 'Deployed':
                        board = completed
                        break;
                    default:
                        break;
    
                }
                break;
            case 'Pre-BE Technical Analysis':
                flair_color = 'primary'
                issue.status.name == 'Proceed BEQ' ? board = completed : board = to_do
                issue.tracker.name = 'Pre-BE'
                break;
            default:
                break;
        }

        // create new card
        card = `
            <div class="card" style="width: 100%">
                <div class="card-body">
                    <span class="badge bg-${flair_color}">${issue.tracker.name}</span>

                    <h5 class="card-title">${issue.subject}</h5>
                    <h6 class="card-subtitle mb-2 text-muted font-italic">${issue.status.name}</h6>
                    <p class="card-text mt-4">
                        <img src="images/avatars/1.png" alt="" class="rounded-circle me-2" width="32"
                height="32" />
                        <img src="images/avatars/2.png" alt="" class="rounded-circle me-2" width="32"
                        height="32" />
                    </p>
                </div>
            </div>
        `
        list = document.createElement('li')
        list.innerHTML = card

        // append card to board
        board.appendChild(list)

    })
}




