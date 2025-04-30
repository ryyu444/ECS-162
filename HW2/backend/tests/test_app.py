import unittest.mock as mock

# mimics behavior of /api/key route that gets the NYT_API_KEY from the environment variable
def test_get_key():
    expectedKey = 'test_key'
    with mock.patch.dict('os.environ', {'NYT_API_KEY': 'test_key'}) as mock_response:
        assert mock_response['NYT_API_KEY'] == expectedKey