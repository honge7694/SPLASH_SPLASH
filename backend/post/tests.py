from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from django.contrib.auth import get_user_model


User = get_user_model()

class PostCreateTest(APITestCase):
    @classmethod
    def setUpTestData(cls):
        cls.user_data = {
            'email': 'test@naver.com',
            'password': 'password123',
        }

        cls.post_data = {
            'title': 'some title',
            'content': 'some content',
        }

        cls.user = User.objects.create_user(
            "test@naver.com",
            "hello, Test",
            "장고",
            "테스트",
            "01012123434",
            "2023-02-01",
            "F",
            "password123",
        )

    def setUp(self):
        self.access_token = self.client.post(reverse('token_obtain_pair'), self.user_data).data['access']

    def test_create_post(self):
        response = self.client.post(
            reverse('post_list'),
            data=self.post_data,
            HTTP_AUTHORIZATION=f"Bearer {self.access_token}"
        )

        return self.assertEquals(response.status_code, 201)

