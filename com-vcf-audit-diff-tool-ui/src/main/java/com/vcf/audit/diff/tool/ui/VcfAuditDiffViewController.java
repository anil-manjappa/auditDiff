package com.vcf.audit.diff.tool.ui;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class VcfAuditDiffViewController {
	
	@RequestMapping("/diff")
	public String home(Model model) {
		return "index";
	}
}
