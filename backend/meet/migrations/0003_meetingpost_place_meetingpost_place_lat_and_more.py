# Generated by Django 4.1.5 on 2023-03-05 13:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("meet", "0002_meetingpost_status"),
    ]

    operations = [
        migrations.AddField(
            model_name="meetingpost",
            name="place",
            field=models.CharField(default="청주실내수영장", max_length=255),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="meetingpost",
            name="place_lat",
            field=models.CharField(default=127.469620902536, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="meetingpost",
            name="place_lng",
            field=models.CharField(default=36.6409611807314, max_length=100),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="meetingpost",
            name="time_at",
            field=models.TimeField(null=True),
        ),
    ]