from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
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

    email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])
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


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        refresh = self.get_token(self.user)
        data['refresh'] =  str(refresh)
        data['access'] = str(refresh.access_token)

        data['user_info'] ={ 
            'id': self.user.id,
            'nickname' : self.user.nickname,
        }
        
        return data



