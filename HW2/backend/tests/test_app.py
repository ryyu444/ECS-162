import unittest.mock as mock

def test_get_key():
    with mock.patch.dict('os.environ', {'apiKey': 'test_key'}) as mock_response:
        assert mock_response['apiKey'] == 'test_key'