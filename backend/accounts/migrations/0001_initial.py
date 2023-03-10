# Generated by Django 4.1.5 on 2023-01-31 09:59

from django.conf import settings
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="User",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("password", models.CharField(max_length=128, verbose_name="password")),
                (
                    "last_login",
                    models.DateTimeField(
                        blank=True, null=True, verbose_name="last login"
                    ),
                ),
                ("email", models.EmailField(max_length=255, unique=True)),
                ("first_name", models.CharField(max_length=50)),
                ("last_name", models.CharField(max_length=50)),
                ("nickname", models.CharField(max_length=50)),
                (
                    "phone_number",
                    models.CharField(
                        blank=True,
                        max_length=13,
                        validators=[
                            django.core.validators.RegexValidator(
                                "^010-?[1-9]\\d{3}-?\\d{4}$"
                            )
                        ],
                    ),
                ),
                ("date_of_birth", models.DateField()),
                (
                    "gender",
                    models.CharField(choices=[("M", "남성"), ("F", "여성")], max_length=1),
                ),
                (
                    "avatar",
                    models.ImageField(
                        blank=True,
                        help_text="48px * 48px 크기의 png/jpg 파일을 업로드해주세요.",
                        upload_to="accounts/avatar/%Y/%m/%d",
                    ),
                ),
                ("is_active", models.BooleanField(default=True)),
                ("is_admin", models.BooleanField(default=False)),
                (
                    "following_set",
                    models.ManyToManyField(
                        blank=True,
                        related_name="follower_set",
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={
                "abstract": False,
            },
        ),
    ]
