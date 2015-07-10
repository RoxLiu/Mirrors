package com.rox.app.mirrors.web.controller;

import com.rox.app.mirrors.core.entity.PostItem;
import com.rox.app.mirrors.web.service.PostService;
import com.rox.app.mirrors.web.util.Servlets;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.ServletRequest;
import java.io.UnsupportedEncodingException;
import java.util.Map;

@Controller
@RequestMapping("/author")
public class AuthorController extends BaseController{
    @Autowired
    private PostService postService = null;

    @RequestMapping("/block")
    @ResponseBody
    public ModelAndView blockItem(String username) {
        postService.updatePostItemWithBlockAuthor(username, PostItem.TYPE_DELETED);

        return super.ajaxDoneSuccess("加入黑名单成功！");
    }

    @RequestMapping("/unblock")
    @ResponseBody
    public ModelAndView unblockItem(String username) {
        postService.updatePostItemWithBlockAuthor(username, PostItem.TYPE_GENERAL);

        return super.ajaxDoneSuccess("取消黑名单成功！");
    }

    @RequestMapping("/highlight")
    @ResponseBody
    public ModelAndView highlightItem(String username) {
        postService.updatePostItemWithBlockAuthor(username, PostItem.TYPE_HIGHLIGHT);

        return super.ajaxDoneSuccess("关注成功！");
    }

    @RequestMapping("/unhighlight")
    @ResponseBody
    public ModelAndView unhighlightItem(String username) {
        postService.updatePostItemWithBlockAuthor(username, PostItem.TYPE_GENERAL);

        return super.ajaxDoneSuccess("取消关注成功！");
    }

    @RequestMapping({"/post/{author}"})
    public ModelAndView createAuthorPostView(@PathVariable("author") String author, Model model, ServletRequest request) {
        ModelAndView mv = new ModelAndView("author/author_post_list");

        try {
            author = new String(author.getBytes("ISO-8859-1"), "UTF-8");
        } catch (UnsupportedEncodingException e) {
//            e.printStackTrace();
        }

        Page<PostItem> pager = postService.loadPostItemByAuthor(author, 1, 100);
        // 将数据放到前台
        model.addAttribute("pager", pager);
        model.addAttribute("pageSize", 100);
        model.addAttribute("author", author);

        return mv;
    }

    @RequestMapping({"/post/{author}/{page}"})
    public ModelAndView createAuthorPostView(@PathVariable("author") String author, @PathVariable("page") int page, Model model, ServletRequest request) {
        ModelAndView mv = new ModelAndView("author/author_post_list");

        try {
            author = new String(author.getBytes("ISO-8859-1"), "UTF-8");
        } catch (UnsupportedEncodingException e) {
//            e.printStackTrace();
        }

        Page<PostItem> pager = postService.loadPostItemByAuthor(author, page, 100);
        // 将数据放到前台
        model.addAttribute("pager", pager);
        model.addAttribute("pageSize", 100);
        model.addAttribute("author", author);

        return mv;
    }
}
