# Generated by Django 4.1.5 on 2023-03-01 08:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("meet", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="meetingpost",
            name="status",
            field=models.CharField(
                choices=[("success", "모집중"), ("warning", "모집종료")],
                default="warning",
                max_length=20,
            ),
            preserve_default=False,
        ),
    ]