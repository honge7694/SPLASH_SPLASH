from django.contrib import admin
from .models import Post, PostImage


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', 'content', 'author', 'created_at', 'updated_at',]
    readonly_fields = ['images']

    def images(self, obj):
        return obj.image_set.all()


