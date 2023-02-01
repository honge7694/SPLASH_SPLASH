from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model


User = get_user_model()

class UserRegistrationTestCase(APITestCase):
    def test_registration(self):
        url = reverse("signup")
        user_data = {
            "email": "testuser@naver.com",
            "password": "password123",
            "nickname": "hello, Test",
            "first_name": "장고",
            "last_name": "테스트",
            "phone_number": "01012123434",
            "date_of_birth": "2023-02-01",
            "gender": "F"
        }
        response = self.client.post(url, user_data)
        print('response data : ', response.data)
        self.assertEqual(response.status_code, 201)


class LoginUserTest(APITestCase):
    def setUp(self):
        self.login_data = {
            'email': 'testuser@naver.com',
            'password': 'password123',
        }
        self.user_data = User.objects.create_user(
            "testuser@naver.com",
            "hello, Test",
            "장고",
            "테스트",
            "01012123434",
            "2023-02-01",
            "F",
            "password123",
        )
    
    def test_login(self):
        response = self.client.post(reverse('token_obtain_pair'), self.login_data)
        print('login response : ', response.data['access'])
        self.assertEqual(response.status_code, 200)
