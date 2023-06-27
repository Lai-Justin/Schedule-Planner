# Backend Testing
For testing the backend, we use the JavaScript libraries Mocha, Sinon, and Chai.

It works by testing specific functionalities of the backend, and then verifies that they behave as expected.

To run the testing:

cd into 4-year-planner/backend

run 'npm install'

run 'mocha'

---
# Unit Testing
For unit testing, we use Sinon.js to mock the 'find' function of the Major class. We then call majorController.majorInfo and verify that it behaves as expected.

---
# Component Testing
For component testing, we use Chai to make http requests and test that our backend endpoints work as expected.

---

We don't intend to continue writing extensive tests. This is mainly because we have a lot of work to do, and we feel our time could be better spent implementing features instead of writing tests. This is especially true, because our app is relatively simple, so there really aren't many things that could go wrong that tests would help with.
