# Generated by Django 4.1.5 on 2023-04-24 08:22

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("chat", "0001_initial"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="chat",
            options={"ordering": ["-pk"]},
        ),
    ]