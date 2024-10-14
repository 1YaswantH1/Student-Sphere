document.addEventListener('DOMContentLoaded', function () {
    const pollForm = document.getElementById('pollForm');
    const pollsContainer = document.getElementById('pollsContainer');

    // Retrieve polls from local storage (if any)
    let polls = JSON.parse(localStorage.getItem('polls')) || [];

    // Display all existing polls
    renderPolls();

    // Add event listener for the form submission
    pollForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const pollQuestion = document.getElementById('pollQuestion').value;
        const pollOptions = document.getElementById('pollOptions').value.split(',').map(option => option.trim());

        if (pollQuestion && pollOptions.length > 0) {
            // Create a new poll object
            const newPoll = {
                id: Date.now(),
                question: pollQuestion,
                options: pollOptions.map(option => ({ name: option, votes: 0 }))
            };

            // Add the new poll to the list
            polls.push(newPoll);

            // Update the local storage
            localStorage.setItem('polls', JSON.stringify(polls));

            // Reset the form
            pollForm.reset();

            // Re-render the polls
            renderPolls();
        }
    });

    // Function to render the polls on the page
    function renderPolls() {
        pollsContainer.innerHTML = '';

        polls.forEach(poll => {
            const pollElement = document.createElement('li');

            const pollOptionsHtml = poll.options.map((option, index) => `
                <div class="poll-option">
                    <span>${option.name}</span>
                    <button onclick="vote(${poll.id}, ${index})">Vote</button>
                    <span class="votes">${option.votes} votes</span>
                </div>
            `).join('');

            pollElement.innerHTML = `
                <div class="poll-details">
                    <strong>${poll.question}</strong>
                    <div class="poll-options">
                        ${pollOptionsHtml}
                    </div>
                    <button class="delete-poll" onclick="deletePoll(${poll.id})">Delete Poll</button>
                </div>
            `;

            pollsContainer.appendChild(pollElement);
        });
    }

    // Function to delete a poll
    window.deletePoll = function (id) {
        polls = polls.filter(poll => poll.id !== id);

        // Update local storage
        localStorage.setItem('polls', JSON.stringify(polls));

        // Re-render the polls
        renderPolls();
    };

    // Function to vote on a poll option
    window.vote = function (pollId, optionIndex) {
        const poll = polls.find(poll => poll.id === pollId);
        if (poll) {
            poll.options[optionIndex].votes += 1;

            // Update local storage
            localStorage.setItem('polls', JSON.stringify(polls));

            // Re-render the polls
            renderPolls();
        }
    };
});