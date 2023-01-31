from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()

class UserSerializer(serializers.Serializer):
    '''
    유저 정보
    '''
    class Meta:
        model = User
        fields = ['pk', 'email', 'first_name', 'last_name', 'nickname', 'date_of_birth', 'gender', 'phone_number', 'avatar', 'following_set',]


class SignupSerializer(serializers.Serializer):
    '''
    유저 회원 가입
    '''
    class Meta:
        model = User
        fields = '__all__'

    GenderChoices = (
        ('M', '남성'),
        ('F', '여성')
    )

    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
    nickname = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    date_of_birth = serializers.DateField()
    phone_number = serializers.CharField()
    gender = serializers.ChoiceField(choices=GenderChoices)

    def create(self, validated_data):
        user = User.objects.create(
            email = validated_data['email'],
            nickname = validated_data['nickname'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            date_of_birth = validated_data['date_of_birth'],
            phone_number = validated_data['phone_number'],
            gender = validated_data['gender']
        )

        user.set_password(validated_data['password'])
        user.save()

        return user

