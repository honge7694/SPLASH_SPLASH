from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.core.validators import RegexValidator
from django.shortcuts import resolve_url


class UserManager(BaseUserManager):
    def create_user(self, email, nickname, first_name, last_name, phone_number, date_of_birth, gender, password=None):
        if not email:
            raise ValueError('Users must have an email address')
        elif not first_name:
            raise ValueError('first_name을 입력해주세요.')
        elif not last_name:
            raise ValueError('last_name을 입력해주세요.')
        elif not phone_number:
            raise ValueError('phone_number를 입력해주세요.')
        elif not date_of_birth:
            raise ValueError('date_of_birth를 입력해주세요.')
        elif not gender:
            raise ValueError('gender를 입력해주세요.')
        elif not password:
            raise ValueError('password를 입력해주세요.')

        user = self.model(
            email=self.normalize_email(email),
            nickname=nickname,
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
            date_of_birth=date_of_birth,
            gender=gender,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, nickname, first_name, last_name, phone_number, date_of_birth, gender, password=None):
        user = self.create_user(
            email,
            nickname=nickname,
            first_name=first_name,
            last_name=last_name,
            phone_number=phone_number,
            date_of_birth=date_of_birth,
            gender=gender,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser):
    class GenderChoices(models.TextChoices):
        MALE = 'M', '남성'
        FEMALE = 'F', '여성'

    email = models.EmailField(max_length=255, unique=True)
    nickname = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    phone_number = models.CharField(max_length=13, blank=True, validators=[RegexValidator(r"^010-?[1-9]\d{3}-?\d{4}$")])
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=1, choices=GenderChoices.choices)
    following_set = models.ManyToManyField('self', related_name='follower_set', symmetrical=False, blank=True)
    avatar = models.ImageField(
        blank=True,
        upload_to="accounts/avatar/%Y/%m/%d",
        help_text="48px * 48px 크기의 png/jpg 파일을 업로드해주세요.",
    )
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nickname', 'first_name', 'last_name', 'phone_number', 'date_of_birth', 'gender',]

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}".strip()

    @property
    def avatar_url(self):
        if self.avatar:
            return self.avatar.url
        else:
            return resolve_url("pydenticon_image", self.name)

    def __str__(self):
        return self.name

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin